import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './Product3DViewer.css'

export default function Product3DViewer({ product, onClose  }) {
  const containerRef = useRef(null)
  const rafRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 场景、相机、渲染器
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(product.color)
    
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    // 设置相机位置 以及缩放
    camera.position.set(0, 0, 2)
    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio || 1)
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    // renderer是一个<canvas>元素
    container.appendChild(renderer.domElement)

    // 轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.screenSpacePanning = false
    // 限制缩放范围
    controls.minDistance = 1
    controls.maxDistance = 50

    // 光照系统
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)
    // 主光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // 额外的补光
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.4)
    frontLight.position.set(0, 0, 10)
    scene.add(frontLight)

    let model = null

    // 加载GLTF模型
    const loader = new GLTFLoader()
    loader.load(
      '/module/red_-_pokemon/scene.gltf',
      (gltf) => {
        model = gltf.scene
        
        // 计算模型边界盒以便适当缩放和定位
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3()).length()
        const center = box.getCenter(new THREE.Vector3())
        
        // 缩放模型到合适大小
        model.scale.multiplyScalar(2 / size)
        
        // 居中模型
        model.position.copy(center).multiplyScalar(-2 / size)
        
        // 启用阴影
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        scene.add(model)
        setLoading(false)
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%')
      },
      (error) => {
        console.error('Error loading GLTF model:', error)
        setError('加载3D模型失败')
        setLoading(false)
      }
    )

    // 动画循环
    const animate = () => {
      controls.update()
      
      // 可选：让模型缓慢旋转
      if (model) {
        model.rotation.y += 0.005
      }
      
      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    // 响应式尺寸
    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // 清理
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)

      // 清理控制器
      if (controls) {
        controls.dispose()
      }
      // 删除场景中的对象并释放几何体/材质
      try {
        scene.traverse((obj) => {
          if (obj.isMesh) {
            if (obj.geometry) obj.geometry.dispose()
            if (obj.material) {
              if (Array.isArray(obj.material)) {
                obj.material.forEach((m) => m.dispose && m.dispose())
              } else {
                obj.material.dispose && obj.material.dispose()
              }
            }
          }
        })
      } catch (e) {
        // ignore
      }

      // 释放渲染器上下文
      try {
        renderer.forceContextLoss && renderer.forceContextLoss()
      } catch (e) {}
      try {
        renderer.dispose && renderer.dispose()
      } catch (e) {}

      // 移除 canvas
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [product, product.color])

  return (
    <div className="viewer-overlay">
      <div className="viewer-backdrop" onClick={onClose} />
      <div className="viewer-panel">
        <button onClick={onClose} className="close-btn">关闭</button>
        <div ref={containerRef} className="viewer-canvas">
          {loading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <div>加载3D模型中...</div>
            </div>
          )}
          {error && (
            <div className="error-overlay">
              <div className="error-message">{error}</div>
            </div>
          )}
        </div>
        <div className="title">手办 3D 模型</div>
        <div className="controls-hint">
          拖拽旋转 | 滚轮缩放 | 右键平移
        </div>
      </div>
    </div>
  )
}