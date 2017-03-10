(function() {
    'use strict';

    angular
        .module('agwUi')
        .controller('WorkController', ['projects', '$log', '$state', 'util', '$analytics', WorkController]);

    /** @ngInject */
    function WorkController(projects, $log, $state, util, $analytics){
        $analytics.pageTrack('/work/list');
        // var _ = lodash;
        var vm = this;
        vm.data = [];
        vm.active = 0;
        vm.skills = [];
        vm.selectedSkill = '';
        vm.filter = filterSkills;
        vm.filterSkills = filterSkills;
        vm.srcSet = util.srcSet;
        vm.displaySkills = false;

        vm.goToDetail = function(id, value) {
            $state.go('work.detail', { id: id, node: value });
        };

        vm.goToSkill = function(value) {
            vm.selectedSkill = value;
            vm.filterSkills({}, value);
            vm.skillsToggle();
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
            vm.projects = _.filter(vm.data, function(i) {
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

        function getByTerms(){
            // books.query();
            var hash = util.cacheGet('projectHash');
            var records = util.cacheGet('projects');
            if(records && records.key === hash){
                vm.data = records.items;
                vm.projects = records.items;
                vm.skills = _.uniq(_.flatten(getAllSkills(records.items)), function(item) {
                    return item.tid;
                });
                return;
            } else {
                projects.getProjects({}, function(response) {
                    $log.info('Success! Got projects.');
                    vm.data = response.items;
                    vm.projects = response.items;
                    vm.skills = _.uniq(_.flatten(getAllSkills(response.items)), function(item) {
                        return item.tid;
                    });
                    util.cacheSet('projectHash', response.key);
                    util.cacheSet('projects', {key: response.key, items: response.items});
                }, function() {
                    $log.info('Error! Project fetch failed.');
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

        getByTerms();
    }
})();
