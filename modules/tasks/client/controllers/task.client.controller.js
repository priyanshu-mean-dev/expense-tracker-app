
(function () {
  'use strict';

  angular
    .module('tasks')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['$scope', '$state', '$window', 'taskResolve', 'Authentication', 'Notification'];

  function TasksController($scope, $state, $window, task, Authentication, Notification) {
    var vm = this;

    vm.task = task;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Task
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.task.$remove(function () {
          $state.go('tasks.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Task deleted successfully!' });
        });
      }
    }

    // Save Task
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.taskForm');
        return false;
      }

      // Create a new task, or update the current instance
      vm.task.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('tasks.list'); // should we send the User to the list or the updated Task's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Task saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Task save error!' });
      }
    }
  }
}());
