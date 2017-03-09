(function() {
    'use strict';
    angular
        .module('agwUi')
        .controller('HomeController', HomeController);

    function HomeController(ngSnap, util, projects){
        var vm = this;
        var time = util.getGreeting();
        vm.greeting = time.greeting;
        vm.period = time.period;
        vm.stick_count = 0;
        var s = ngSnap('#svg');
        var sV = ngSnap('#svg-two');
        // var mina;

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function boxOLines() {
            //    top
            buildLineCube_h1(0, 75, 0, 300, 'front', 300, 1, 1000);
            buildLineCube_h1(90, 165, 0, 300, 'back', 300, 1, 1000);
            buildLineCube_h1(180, 255, 0, 300, 'front', 300, 1, 1000);
            buildLineCube_h1(270, 345, 0, 300, 'back', 300, 1, 1000);
            //    bottom
            buildLineCube_v1(0, 65, 50, 300, 'back', 300, 1, 1000);
            buildLineCube_v1(125, 165, 50, 300, 'front', 300, 1, 1000);
            buildLineCube_v1(225, 265, 50, 300, 'back', 300, 1, 1000);
            buildLineCube_v1(325, 365, 50, 300, 'front', 300, 1, 1000);

        }

        function buildLineCube_v1(x1, x2, start, end, dir, pointer, stroke, limit) {
            var center_1 = getRandomArbitrary(0, 1400),
                line = sV.line(x1, center_1, x2, center_1);
            line.attr({
                stroke: '#' + Math.floor(Math.random() * 16777215).toString(16),
                strokeWidth: stroke
            });
            line.animate({ x1: x1 - 20 }, 100, mina.bounce, function() {
                var tilt = getRandomArbitrary(2, 50),
                    tilt_2 = getRandomArbitrary(1, 46),
                    inst = this;
                inst.animate({ y1: pointer }, 400, mina.bounce);
                inst.animate({ y2: pointer }, 400, mina.bounce);
                if (tilt < 25) {
                    tilt = pointer - tilt;
                } else {
                    tilt = pointer + tilt;
                }
                if (tilt > 25) {
                    tilt_2 = pointer - tilt_2;
                } else {
                    tilt_2 = pointer + tilt_2;
                }
                inst.animate({ y1: tilt }, 700, mina.bounce, function() {
                    var instW = this;
                    instW.animate({ y1: tilt_2 }, 200, mina.bounceslide);
                    if (pointer > end && dir === 'front') {
                        dir = 'back';
                    }
                    if (pointer < start && dir === 'back') {
                        dir = 'front';
                    }
                    if (dir === 'back') {
                        pointer = pointer - 15;
                    } else {
                        pointer = pointer + 25;
                    }
                    if (vm.stick_count < limit) {
                        buildLineCube_v1(x1, x2, start, end, dir, pointer, stroke, limit);
                        vm.stick_count++;
                    }
                });
            });
        }

        function buildLineCube_h1(y1, y2, start, end, dir, pointer, stroke, limit) {
            //  Where we are coming from.
            var center_1 = getRandomArbitrary(0, 1400),
                //    coords
                line = s.line(center_1, y1, center_1, y2);
            //  characteristics
            line.attr({
                stroke: '#' + Math.floor(Math.random() * 16777215).toString(16),
                strokeWidth: stroke
            });
            //  move the line little from the start in this case lengthing the height of the line
            line.animate({ y1: y1 + 20 }, 100, mina.bounce, function() {
                var inst = this;
                //     we are going to tilt the line one way or the other increments 2-50
                var tilt = getRandomArbitrary(2, 50),
                    tilt_2 = getRandomArbitrary(1, 46);
                //    everytime we circle through we are moving the line along then tilting it later
                inst.animate({ x1: pointer }, 400, mina.bounce);
                inst.animate({ x2: pointer }, 400, mina.bounce);
                //    tilting it from the start based on random number
                if (tilt < 25) {
                    tilt = pointer - tilt;
                } else {
                    tilt = pointer + tilt;
                }

                if (tilt_2 > 25) {
                    tilt_2 = pointer - tilt_2;
                } else {
                    tilt_2 = pointer + tilt_2;
                }
                //    make the tilt happen
                inst.animate({ x1: tilt }, 700, mina.bounce, function() {
                    var instS = this;
                    instS.animate({ x2: tilt_2 }, 200, mina.bounceslide);
                    //      now we determin the direction we are going on the next time around
                    if (pointer > end && dir === 'front') {
                        //        the start or pointer is more than the end mark turn around
                        dir = 'back';
                    }

                    if (pointer < start && dir === 'back') {
                        //        the pointer is less than the start
                        dir = 'front';
                    }
                    if (dir === 'back') {
                        pointer = pointer - 15;
                    } else {
                        pointer = pointer + 25;
                    }
                    if (vm.stick_count < limit) {
                        buildLineCube_h1(y1, y2, start, end, dir, pointer, stroke, limit);
                        vm.stick_count++;
                    } else {
                        //          glowRings();
                    }
                });
            });
        }

        boxOLines();
    }

})();
