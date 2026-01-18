/**
 * Corsono 3D Avatar Scene
 * Creates minimalist 3D avatars on podiums for product categories
 * Uses Three.js for rendering
 */

class AvatarScene {
    constructor(containerId, color = 0xffffff) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.color = color;
        this.init();
        this.animate();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);

        // Camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.set(0, 1, 4);
        this.camera.lookAt(0, 0.5, 0);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);

        // Lighting
        this.setupLighting();

        // Create avatar and podium
        this.createPodium();
        this.createAvatar();

        // Handle resize
        window.addEventListener('resize', () => this.onResize());

        // Mouse interaction
        this.setupMouseInteraction();
    }

    setupLighting() {
        // Ambient light
        const ambient = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambient);

        // Key light (spotlight from above)
        const keyLight = new THREE.SpotLight(0xffffff, 1.5);
        keyLight.position.set(0, 5, 2);
        keyLight.angle = Math.PI / 6;
        keyLight.penumbra = 0.5;
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;
        this.scene.add(keyLight);

        // Rim light (subtle backlight)
        const rimLight = new THREE.PointLight(0xffffff, 0.5);
        rimLight.position.set(-2, 2, -2);
        this.scene.add(rimLight);
    }

    createPodium() {
        // Circular podium base
        const podiumGeometry = new THREE.CylinderGeometry(0.8, 0.9, 0.1, 32);
        const podiumMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            metalness: 0.2,
            roughness: 0.8
        });
        this.podium = new THREE.Mesh(podiumGeometry, podiumMaterial);
        this.podium.position.y = 0.05;
        this.podium.receiveShadow = true;
        this.scene.add(this.podium);

        // Podium ring highlight
        const ringGeometry = new THREE.RingGeometry(0.75, 0.8, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x333333,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.11;
        this.scene.add(ring);
    }

    createAvatar() {
        // Stylized humanoid figure - abstract mannequin style
        const avatarGroup = new THREE.Group();

        // Body (torso)
        const torsoGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.6, 16);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: this.color,
            metalness: 0.1,
            roughness: 0.6
        });
        const torso = new THREE.Mesh(torsoGeometry, bodyMaterial);
        torso.position.y = 0.7;
        torso.castShadow = true;
        avatarGroup.add(torso);

        // Chest
        const chestGeometry = new THREE.SphereGeometry(0.22, 16, 16);
        const chest = new THREE.Mesh(chestGeometry, bodyMaterial);
        chest.position.y = 0.95;
        chest.scale.set(1, 0.8, 0.7);
        chest.castShadow = true;
        avatarGroup.add(chest);

        // Head
        const headGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const head = new THREE.Mesh(headGeometry, bodyMaterial);
        head.position.y = 1.25;
        head.scale.set(0.9, 1.1, 0.85);
        head.castShadow = true;
        avatarGroup.add(head);

        // Neck
        const neckGeometry = new THREE.CylinderGeometry(0.06, 0.08, 0.12, 8);
        const neck = new THREE.Mesh(neckGeometry, bodyMaterial);
        neck.position.y = 1.08;
        avatarGroup.add(neck);

        // Arms (simplified)
        const armGeometry = new THREE.CylinderGeometry(0.05, 0.06, 0.5, 8);

        const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
        leftArm.position.set(-0.28, 0.75, 0);
        leftArm.rotation.z = 0.15;
        leftArm.castShadow = true;
        avatarGroup.add(leftArm);

        const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
        rightArm.position.set(0.28, 0.75, 0);
        rightArm.rotation.z = -0.15;
        rightArm.castShadow = true;
        avatarGroup.add(rightArm);

        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.08, 0.07, 0.5, 8);

        const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
        leftLeg.position.set(-0.1, 0.35, 0);
        leftLeg.castShadow = true;
        avatarGroup.add(leftLeg);

        const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
        rightLeg.position.set(0.1, 0.35, 0);
        rightLeg.castShadow = true;
        avatarGroup.add(rightLeg);

        // Position on podium
        avatarGroup.position.y = 0.1;
        this.avatar = avatarGroup;
        this.scene.add(avatarGroup);
    }

    setupMouseInteraction() {
        let mouseX = 0;
        let targetRotation = 0;

        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            targetRotation = mouseX * 0.5;
        });

        this.container.addEventListener('mouseleave', () => {
            targetRotation = 0;
        });

        this.targetRotation = 0;
        this.updateRotation = () => {
            if (this.avatar) {
                this.avatar.rotation.y += (targetRotation - this.avatar.rotation.y) * 0.05;
            }
        };
    }

    onResize() {
        if (!this.container) return;

        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Subtle idle animation
        if (this.avatar) {
            this.avatar.position.y = 0.1 + Math.sin(Date.now() * 0.001) * 0.02;
        }

        // Update mouse-based rotation
        if (this.updateRotation) {
            this.updateRotation();
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize scenes when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create different colored avatars for each category
    new AvatarScene('podium-tshirts', 0xffffff);
    new AvatarScene('podium-hoodies', 0xcccccc);
    new AvatarScene('podium-outerwear', 0x999999);
});
