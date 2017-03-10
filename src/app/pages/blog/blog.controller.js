(function() {
    'use strict';

    angular
        .module('agwUi')
        .controller('BlogController', ['posts', '$log', '$state', 'util', BlogController]);

    /** @ngInject */
    function BlogController(posts, $log, $state, util){
        // var _ = lodash;
        var vm = this;
        vm.data = [];
        vm.active = 0;
        vm.skills = [];
        vm.selectedSkill = '';
        vm.filter = filterSkills;
        vm.filterSkills = filterSkills;
        vm.displaySkills = false;
        vm.trustTextHtml = util.agwTrustTextHtml;

        vm.goToDetail = function(id, value) {
            $state.go('blog.detail', { id: id, node: value });
        };

        vm.goToSkill = function(value, toggle) {
            vm.selectedSkill = value;
            vm.filterSkills({}, value);
            if(toggle){
                vm.skillsToggle();
            }
        };

        vm.skillsToggle = function(){
            vm.displaySkills = !vm.displaySkills;
        };

        function filterSkills(item, model) {
            var ct;
            if (item) {
                ct = model.name.toLowerCase();
            } else {
                ct = vm.selectedSkill.toLowerCase();
            }
            vm.posts = _.filter(vm.data, function(i) {
                if (ct == '') {
                    return true;
                }
                var truth = false;
                _.each(i.terms, function(s) {
                    if (s.name.toLowerCase().indexOf(ct) > -1) {
                        truth = true;
                    }
                });
                return truth;
            });
        };

        function getPosts(){
            var hash = util.cacheGet('postHash');
            var records = util.cacheGet('posts');
            if(records && records.key === hash){
                vm.data = records.items;
                vm.posts = records.items;
                vm.skills = _.uniq(_.flatten(getAllSkills(records.items)), function(item) {
                    return item.tid;
                });
                return;
            } else {
                posts.query({}, function(response) {
                    $log.info('Success! Got posts.');
                    vm.data = response.items;
                    vm.posts = response.items;
                    vm.skills = _.uniq(_.flatten(getAllSkills(response.items)), function(item) {
                        return item.tid;
                    });
                    util.cacheSet('postHash', response.key);
                    util.cacheSet('posts', {key: response.key, items: response.items});
                }, function() {
                    $log.info('Error! Post fetch failed.');
                });
            }
        }

        function getAllSkills(data) {
            var skills = [];
            _.each(data, function(s) {
                skills.push(s.terms);
            });
            $log.info(skills);
            return skills;
        };

        getPosts();
    }
})();
