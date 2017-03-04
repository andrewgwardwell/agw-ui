(function() {
    'use strict';

    angular
        .module('agwUi')
        .controller('WorkController', WorkController);

    /** @ngInject */
    function WorkController(projects, $log, $state){
        // var _ = lodash;
        var vm = this;
        vm.data = [];
        vm.active = 0;
        vm.skills = [];
        vm.selectedSkill = '';
        vm.filter = filterSkills;
        vm.filterSkills = filterSkills;

        vm.goToDetail = function(id, value) {
            $state.go('work.detail', { id: id, node: value });
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
            projects.getProjects({}, function(response) {
                $log.info('Success! Got projects.');
                vm.data = response;
                vm.projects = response;
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

        getByTerms();
    }
})();
