(function() {
    'use strict';

    angular
        .module('agwUi')
        .controller('BlogController', BlogController);

    /** @ngInject */
    function BlogController(posts, $log, $state, $sce, util){
        // var _ = lodash;
        var vm = this;
        vm.data = [];
        vm.active = 0;
        vm.skills = [];
        vm.selectedSkill = '';
        vm.filter = filterSkills;
        vm.filterSkills = filterSkills;
        vm.displaySkills = false;

        vm.goToDetail = function(id, value) {
            $state.go('blog.detail', { id: id, node: value });
        };

        vm.goToSkill = function(value, toggle = true) {
            vm.selectedSkill = value;
            vm.filterSkills({}, value);
            if(toggle){
                vm.skillsToggle();
            }
        };

        vm.skillsToggle = function(){
            vm.displaySkills = !vm.displaySkills;
        };

        vm.deliberatelyTrustDangerousSnippet = function(text){
            return $sce.trustAsHtml(text);
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
            // books.query();
            posts.query({}, function(response) {
                $log.info('Success! Got projects.');
                vm.data = response;
                vm.posts = response;
                vm.skills = _.uniq(_.flatten(getAllSkills(response)), function(item) {
                    return item.tid;
                });
            }, function() {
                $log.info('Error! Project fetch failed.');
            });
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
