import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Self-contained, non-scrolling port of the `phone.js`-style rendered phone
// mockup (see ~/wsh things/App Association — src/pages/about/PhoneStage.jsx).
// That version drives pose + screen image off page scroll position across a
// whole route; here there's exactly one section and one pose, so all of the
// scroll/stage-resolution machinery is dropped. The only moving part left is
// the screen texture, which crossfades to `image` whenever it changes.

const TILT_DEG = -14
const START_TILT_DEG = -90
const TILT_ENTRANCE_MS = 400
const BASE_SCALE = 0.9
const SCREEN_FILL_COLOR = '#0a0a0a'
const FADE_MS = 320

// --- Camera ---
const CAMERA_FOV = 35
const CAMERA_NEAR = 0.1
const CAMERA_FAR = 100
const CAMERA_Z = 6.4

// --- Lighting ---
const AMBIENT_LIGHT_INTENSITY = 0.6
const KEY_LIGHT_INTENSITY = 0.9
const KEY_LIGHT_POSITION: [number, number, number] = [4, 5, 6]
const FILL_LIGHT_INTENSITY = 0.35
const FILL_LIGHT_POSITION: [number, number, number] = [-5, -2, 4]

// --- Phone body ---
const BODY_WIDTH = 2
const BODY_HEIGHT = 4
const BODY_DEPTH = 0.18
const BODY_RADIUS = 0.32
const BODY_COLOR = 0x1c1c1c
const BODY_ROUGHNESS = 0.45
const BODY_METALNESS = 0.4
const BEVEL_THICKNESS = 0.02
const BEVEL_SIZE = 0.02
const BEVEL_SEGMENTS = 6
const BODY_CURVE_SEGMENTS = 32

// --- Screen ---
const SCREEN_INSET = 0.06
const SCREEN_CURVE_SEGMENTS = 32
const SCREEN_CANVAS_WIDTH = 1024

// --- Notch ---
const NOTCH_WIDTH = 0.7
const NOTCH_HEIGHT = 0.16
const NOTCH_TOP_MARGIN = 0.18
const NOTCH_COLOR = 0x000000

// Overshoots past 1 before settling — gives the tilt entrance some bounce.
const BACK_EASE_OVERSHOOT = 1.70158

function easeOutBack(t: number) {
  const c1 = BACK_EASE_OVERSHOOT
  const c3 = c1 + 1
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2
}

function roundedRectShape(width: number, height: number, radius: number) {
  const shape = new THREE.Shape()
  const x = -width / 2
  const y = -height / 2
  const r = radius

  shape.moveTo(x, y + r)
  shape.lineTo(x, y + height - r)
  shape.quadraticCurveTo(x, y + height, x + r, y + height)
  shape.lineTo(x + width - r, y + height)
  shape.quadraticCurveTo(x + width, y + height, x + width, y + height - r)
  shape.lineTo(x + width, y + r)
  shape.quadraticCurveTo(x + width, y, x + width - r, y)
  shape.lineTo(x + r, y)
  shape.quadraticCurveTo(x, y, x, y + r)

  return shape
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

type PhoneStageProps = {
  image: string | null
  /** Once this flips true, the phone tilts from START_TILT_DEG to TILT_DEG (with bounce). Plays once. */
  active: boolean
}

export function PhoneStage({ image, active }: PhoneStageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef(image)
  imageRef.current = image
  const activeRef = useRef(active)
  activeRef.current = active

  useEffect(() => {
    const stage = containerRef.current
    if (!stage) return

    const DEG_TO_RAD = Math.PI / 180

    let stageW = stage.clientWidth
    let stageH = stage.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, stageW / stageH, CAMERA_NEAR, CAMERA_FAR)
    camera.position.set(0, 0, CAMERA_Z)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(stageW, stageH)
    stage.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, AMBIENT_LIGHT_INTENSITY))

    const keyLight = new THREE.DirectionalLight(0xffffff, KEY_LIGHT_INTENSITY)
    keyLight.position.set(...KEY_LIGHT_POSITION)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, FILL_LIGHT_INTENSITY)
    fillLight.position.set(...FILL_LIGHT_POSITION)
    scene.add(fillLight)

    const phoneGroup = new THREE.Group()
    scene.add(phoneGroup)
    phoneGroup.scale.setScalar(BASE_SCALE)
    phoneGroup.rotation.y = START_TILT_DEG * DEG_TO_RAD

    // --- Phone body ---
    const bodyShape = roundedRectShape(BODY_WIDTH, BODY_HEIGHT, BODY_RADIUS)

    const bodyGeometry = new THREE.ExtrudeGeometry(bodyShape, {
      depth: BODY_DEPTH,
      bevelEnabled: true,
      bevelThickness: BEVEL_THICKNESS,
      bevelSize: BEVEL_SIZE,
      bevelSegments: BEVEL_SEGMENTS,
      curveSegments: BODY_CURVE_SEGMENTS,
    })
    bodyGeometry.translate(0, 0, -BODY_DEPTH / 2)

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: BODY_COLOR,
      roughness: BODY_ROUGHNESS,
      metalness: BODY_METALNESS,
    })

    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
    phoneGroup.add(bodyMesh)

    // --- Screen ---
    const screenWidth = BODY_WIDTH - SCREEN_INSET * 2
    const screenHeight = BODY_HEIGHT - SCREEN_INSET * 2
    const screenRadius = BODY_RADIUS - SCREEN_INSET
    const screenAspect = screenWidth / screenHeight

    function createScreenGeometry() {
      const shape = roundedRectShape(screenWidth, screenHeight, screenRadius)
      const geometry = new THREE.ShapeGeometry(shape, SCREEN_CURVE_SEGMENTS)

      const positionAttribute = geometry.attributes.position
      const uvAttribute = geometry.attributes.uv

      if (positionAttribute && uvAttribute) {
        const positions = positionAttribute.array
        const uvs = uvAttribute.array

        let minX = Infinity
        let maxX = -Infinity
        let minY = Infinity
        let maxY = -Infinity

        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i]
          const y = positions[i + 1]
          if (x < minX) minX = x
          if (x > maxX) maxX = x
          if (y < minY) minY = y
          if (y > maxY) maxY = y
        }

        const rangeX = maxX - minX
        const rangeY = maxY - minY

        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i]
          const y = positions[i + 1]
          const u = (x - minX) / rangeX
          const v = (y - minY) / rangeY
          const uvIndex = (i / 3) * 2
          uvs[uvIndex] = u
          uvs[uvIndex + 1] = v
        }
      }

      return geometry
    }

    const screenGeometry = createScreenGeometry()
    const FRONT_Z = BODY_DEPTH / 2 + BEVEL_THICKNESS + 0.005

    const screenMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 1,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial)
    screenMesh.position.z = FRONT_Z
    phoneGroup.add(screenMesh)

    function makeBlankScreenCanvas() {
      const canvas = document.createElement('canvas')
      canvas.width = SCREEN_CANVAS_WIDTH
      canvas.height = Math.round(SCREEN_CANVAS_WIDTH / screenAspect)
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = SCREEN_FILL_COLOR
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      return { canvas, ctx }
    }

    const { canvas: compositeCanvas, ctx: compositeCtx } = makeBlankScreenCanvas()
    const compositeTexture = new THREE.CanvasTexture(compositeCanvas)
    compositeTexture.colorSpace = THREE.SRGBColorSpace
    screenMaterial.map = compositeTexture

    const textureCache = new Map<string, { canvas: HTMLCanvasElement }>()

    function getImageCanvas(url: string | null) {
      if (!url) return null
      const cached = textureCache.get(url)
      if (cached) return cached.canvas

      const { canvas, ctx } = makeBlankScreenCanvas()
      textureCache.set(url, { canvas })

      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const imgAspect = img.width / img.height
        const canvasAspect = canvas.width / canvas.height

        let drawWidth: number
        let drawHeight: number
        let offsetX = 0
        let offsetY = 0

        if (imgAspect >= canvasAspect) {
          drawWidth = canvas.width
          drawHeight = canvas.width / imgAspect
          offsetY = (canvas.height - drawHeight) / 2
        } else {
          drawHeight = canvas.height
          drawWidth = canvas.height * imgAspect
          offsetX = (canvas.width - drawWidth) / 2
        }

        ctx.fillStyle = SCREEN_FILL_COLOR
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
      }
      img.onerror = () => console.warn('Failed to load phone screen image:', url)
      img.src = url

      return canvas
    }

    // --- Notch ---
    const notchGeometry = new THREE.PlaneGeometry(NOTCH_WIDTH, NOTCH_HEIGHT)
    const notchMaterial = new THREE.MeshBasicMaterial({ color: NOTCH_COLOR })
    const notchMesh = new THREE.Mesh(notchGeometry, notchMaterial)
    notchMesh.position.set(0, BODY_HEIGHT / 2 - NOTCH_TOP_MARGIN, FRONT_Z + 0.01)
    phoneGroup.add(notchMesh)

    let fromUrl: string | null = null
    let toUrl: string | null = imageRef.current
    let transitionStart = performance.now()
    let rafId: number

    let tiltEntranceTriggered = false
    let tiltEntranceStart = 0

    function compositeImages(mixT: number) {
      const w = compositeCanvas.width
      const h = compositeCanvas.height
      compositeCtx.fillStyle = SCREEN_FILL_COLOR
      compositeCtx.fillRect(0, 0, w, h)

      const canvasFrom = getImageCanvas(fromUrl)
      const canvasTo = getImageCanvas(toUrl)

      if (canvasFrom) compositeCtx.drawImage(canvasFrom, 0, 0)
      if (canvasTo) {
        compositeCtx.globalAlpha = mixT
        compositeCtx.drawImage(canvasTo, 0, 0)
        compositeCtx.globalAlpha = 1
      }

      compositeTexture.needsUpdate = true
    }

    function tick() {
      if (imageRef.current !== toUrl) {
        fromUrl = toUrl
        toUrl = imageRef.current
        transitionStart = performance.now()
      }

      const mixT = clamp((performance.now() - transitionStart) / FADE_MS, 0, 1)
      compositeImages(mixT)

      if (!tiltEntranceTriggered && activeRef.current) {
        tiltEntranceTriggered = true
        tiltEntranceStart = performance.now()
      }
      const tiltT = tiltEntranceTriggered
        ? clamp((performance.now() - tiltEntranceStart) / TILT_ENTRANCE_MS, 0, 1)
        : 0
      const tiltDeg = START_TILT_DEG + (TILT_DEG - START_TILT_DEG) * easeOutBack(tiltT)
      phoneGroup.rotation.y = tiltDeg * DEG_TO_RAD

      renderer.render(scene, camera)

      rafId = requestAnimationFrame(tick)
    }

    function handleResize() {
      if (!stage) return
      stageW = stage.clientWidth
      stageH = stage.clientHeight
      camera.aspect = stageW / stageH
      camera.updateProjectionMatrix()
      renderer.setSize(stageW, stageH)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(stage)

    tick()

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      stage.removeChild(renderer.domElement)
      renderer.dispose()
      bodyGeometry.dispose()
      screenGeometry.dispose()
      notchGeometry.dispose()
      compositeTexture.dispose()
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
