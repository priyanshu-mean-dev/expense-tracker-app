﻿(function () {
  'use strict';

  // Configuring the Tasks Admin module
  angular
    .module('tasks.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Tasks',
      state: 'admin.tasks.list'
    });
  }
}());
