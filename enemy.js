AFRAME.registerComponent("enemy-fireballs", {
    init: function () {
        setInterval(this.shootEnemyfireballs, 2000)
    },
    shootEnemyfireballs: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {           

            //enemyfireballs entity
            var enemyfireballs = document.createElement("a-entity");

            enemyfireballs.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyfireballs.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyfireballs.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyfireballs);


            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();

            //shooting direction
            var enemy = els[i].object3D;
            var player = document.querySelector("#weapon").object3D;

            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);

            //set the velocity and it's direction
            var direction = new THREE.Vector3();

            direction.subVectors(position1, position2).normalize();

            enemyfireballs.setAttribute("velocity", direction.multiplyScalar(10));

            enemyfireballs.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "0",
            });

            var element = document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value);

            //collide event on enemy fireballs
            enemyfireballs.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    if (playerLife > 0) {
                        playerLife -= 1;
                        element.setAttribute("text", {
                            value: playerLife
                        });
                    }
                    if (playerLife <= 0) {
                        //show text
                        var txt = document.querySelector("#over");
                        txt.setAttribute("visible", true);

                        //remove tanks                        
                        var tankEl = document.querySelectorAll(".enemy")

                        for (var i = 0; i < tankEl.length; i++) {
                            scene.removeChild(tankEl[i])

                        }
                    }

                }
            });
            
        }
    },

});
