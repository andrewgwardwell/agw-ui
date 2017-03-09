(function() {
    'use strict';

    angular
        .module('agwUi')
        .directive('agwMenu', agwMenu);

    /** @ngInject */
    function agwMenu() {
        var directive = {
            restrict: 'E',
            scope:{},
            controller: MenuController,
            controllerAs: 'menu',
            templateUrl: 'app/components/menu/menu.html'
        };

        return directive;

        function MenuController($scope, $log, $timeout, $interval, ngSnap, _) {
            var vm = this;
            vm.collapsed = true;
            vm.glow = _.debounce(glowFunc, 50);

            var icon = ngSnap('.icon-svg');
            var iconMobile = ngSnap('.icon-mobile');

            function glowFunc(e) {
                var plot1 = e.clientX > 75 ? -9 : 9;
                var plot2 = e.clientY > 75 ? -9 : 9;
                var old = vm.sum;
                vm.sum = plot1 + plot2;
                makeglow(old > 0);
            }

            function glowRings() {
                // var mic = iconMobile.circle(25, 25, 30);
                var mic = iconMobile.circle(25, 25, 20);
                var mic_2 = iconMobile.circle(25, 25, 10);
                var mic_3 = iconMobile.circle(25, 25, 5);
                vm.m_small_rings = iconMobile.group(mic, mic_2, mic_3);
                var ic = icon.circle(75, 75, 50);
                var ic_1 = icon.circle(75, 75, 40);
                var ic_2 = icon.circle(75, 75, 30);
                var ic_3 = icon.circle(75, 75, 20);
                var ic_4 = icon.circle(75, 75, 10);
                var ic_5 = icon.circle(75, 75, 5);
                vm.small_rings = icon.group(ic, ic_1, ic_2, ic_3, ic_4, ic_5);

                vm.small_rings.attr({
                    //  with a masking effect the darkening works the same way as in photoshop
                    //  darks == the level of transprency
                    stroke: '#' + Math.floor(Math.random() * 16777215).toString(16),
                    strokeWidth: 2
                });
                // colors of the circles
                ic_3.attr({
                    fill: '#' + Math.floor(Math.random() * 16777215).toString(16)
                });

                ic_4.attr({
                    fill: '#' + Math.floor(Math.random() * 16777215).toString(16)
                });

                ic_5.attr({
                    fill: '#' + Math.floor(Math.random() * 16777215).toString(16)
                });
                mic.attr({
                    //  stroke: "#000",
                    strokeWidth: 2,
                    fill: '#' + Math.floor(Math.random() * 16777215).toString(16)
                        //  mask: small_rings
                });
                mic_2.attr({
                    fill: '#' + Math.floor(Math.random() * 16777215).toString(16)
                });
                mic_3.attr({
                    fill: '#' + Math.floor(Math.random() * 16777215).toString(16)
                });
                $interval(function() { colorChange(); }, 2500);
            }

            function colorChange() {
                for (var n = 0; n < 5; n++) {
                    var scolor = '#' + Math.floor(Math.random() * 16777215).toString(16),
                        color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    vm.small_rings[n].animate({ stroke: scolor }, 5000);
                    vm.small_rings[n].animate({ fill: color }, 5000, mina.ease);
                }
            }


            function makeglow(old) {
                var op = old ? ' add' : 'minus';
                for (var n = 0; n < 5; n++) {
                    var val, scolor, radius = parseInt(vm.small_rings[n].attr('r')),
                        color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    if (op == 'add') {
                        scolor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                        val = radius + vm.sum;
                        // stroke = 3;
                    } else {
                        scolor = 'white';
                        val = radius - vm.sum;
                        // stroke = 1;
                    }
                    if (val > 0 && val < 75) {
                        vm.small_rings[n].animate({ r: val }, 400, mina.bounce);
                    }
                    vm.small_rings[n].animate({ fill: color }, 1000, mina.easeInOutBounce);
                    //  for (var i = 0; i < 5; i++){
                    vm.small_rings[n].animate({ stroke: scolor }, 1000);
                    vm.small_rings[n].animate({ strokeWidth: 3 }, 400, function() {
                        var restoreCircle = $interval(function() {
                            vm.small_rings[0].animate({ r: 50 }, 400, mina.bounce);
                            vm.small_rings[1].animate({ r: 40 }, 400, mina.bounce);
                            vm.small_rings[2].animate({ r: 30 }, 400, mina.bounce);
                            vm.small_rings[3].animate({ r: 20 }, 400, mina.bounce);
                            vm.small_rings[4].animate({ r: 10 }, 400, mina.bounce);
                            vm.small_rings[5].animate({ r: 5 }, 400, mina.bounce);
                            $interval.cancel(restoreCircle);
                        }, 10000);
                    });
                }
            }

            glowRings(false);
        }
    }
})();
