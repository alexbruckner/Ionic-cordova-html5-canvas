angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
        setTimeout(function boo() {
            var canvas = document.getElementById("canvas_a");
            var context = canvas.getContext("2d");

            var x1 = 100;   // x of 1. circle center point
            var y1 = 100;   // y of 1. circle center point
            var r1 = 30;    // radius of 1. circle

            var x2 = 100;   // x of 2. circle center point
            var y2 = 100;   // y of 2. circle center point
            var r2 = 100;   // radius of 2. circle

            var radialGradient1 =
                context.createRadialGradient(x1, y1, r1, x2, y2, r2);

            radialGradient1.addColorStop(0, 'rgb(0,   0, 255)');
            radialGradient1.addColorStop(1, 'rgb(0, 255,   0)');

            context.fillStyle = radialGradient1;
            context.fillRect(10, 10, 200, 200);


            // canvas 2:


            var x = 0;
            var y = 15;
            var speed = 5;

            function animate() {

                reqAnimFrame = window.mozRequestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    window.oRequestAnimationFrame
                ;

                reqAnimFrame(animate);

                x += speed;

                if (x <= 0 || x >= 188) {
                    speed = -speed;
                }

                draw();
            }

            function draw() {
                var canvas = document.getElementById("ex1");
                var context = canvas.getContext("2d");

                context.clearRect(0, 0, 500, 170);
                context.fillStyle = "#ff00ff";
                context.fillRect(x, y, 25, 25);
            }

            animate();

            // canvas 3: processing

            function sketchProc(processing) {
                // Override draw function, by default it will be called 60 times per second
                processing.draw = function () {
                    // determine center and max clock arm length
                    var centerX = processing.width / 2, centerY = processing.height / 2;
                    var maxArmLength = Math.min(centerX, centerY);

                    function drawArm(position, lengthScale, weight) {
                        processing.strokeWeight(weight);
                        processing.line(centerX, centerY,
                                centerX + Math.sin(position * 2 * Math.PI) * lengthScale * maxArmLength,
                                centerY - Math.cos(position * 2 * Math.PI) * lengthScale * maxArmLength);
                    }

                    // erase background
                    processing.background(224);

                    var now = new Date();

                    // Moving hours arm by small increments
                    var hoursPosition = (now.getHours() % 12 + now.getMinutes() / 60) / 12;
                    drawArm(hoursPosition, 0.5, 5);

                    // Moving minutes arm by small increments
                    var minutesPosition = (now.getMinutes() + now.getSeconds() / 60) / 60;
                    drawArm(minutesPosition, 0.80, 3);

                    // Moving hour arm by second increments
                    var secondsPosition = now.getSeconds() / 60;
                    drawArm(secondsPosition, 0.90, 1);
                };
            }

            var canvas3 = document.getElementById("canvas1");
            // attaching the sketchProc function to the canvas
            var processingInstance = new Processing(canvas3, sketchProc);


        }, 1000);
    })

    .controller('FriendsCtrl', function ($scope, Friends) {
        $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function ($scope) {
    });
