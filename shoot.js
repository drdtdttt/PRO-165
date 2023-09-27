AFRAME.registerComponent("fireballs", {
    init: function () {
      this.shootBullet();
    },
    shootBullet: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var bullet = document.createElement("a-entity");
  
          bullet.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
          });
  
          bullet.setAttribute("material", "color", "black");
  
          var cam = document.querySelector("#camera-rig");
          pos = cam.getAttribute("position");
  
          bullet.setAttribute("position", {
            x: pos.x,
            y: pos.y + 1,
            z: pos.z - 0.5,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          var position1 = new THREE.vector3();
          var position2 = new THREE.vector3();

          var player=document.querySelector("#weapon").object3D
          var enemy_fireball = fireball.object3D
          player.getWorldPosition(position1);
          enemy_fireball.getWorldPosition(position2);

          var direction = new THREE.vector(3)

          direction.subVectors(position1, position2).normalize();

          fireball.setAttribute("velocity", direction.multiplyScalar(20))

  
          
          fireballs.setAttribute("velocity", direction.multiplyScalar(-50));
  
          var scene = document.querySelector("#scene");
  
          
          fireball.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "50",
          });
  
          
          fireballs.addEventListener("collide", this.removeBullet);
  
          scene.appendChild(bullet);
  
          
          this.shootSound();
        }
      });
    },
   removeFireBalls: function (e) {
      var scene = document.querySelector("#scene");
      
      
      var element = e.detail.target.el;
  
     
      var elementHit = e.detail.body.el;
  
      if (elementHit.id.includes("enemy")) {
       
  
        
        scene.removeChild(elementHit);
      }
      
      element.removeEventListener("collide", this.removeFireBalls);
  
        
      scene.removeChild(element);
    },
    shootSound: function () {
      var entity = document.querySelector("#sound1");
      entity.components.sound.playSound();
    },


  });
  