app.controller('adminController', function($scope,loginService){
	$scope.Menu = [];
	$scope.Usuario = sessionStorage.usuario;
	$scope.idPerfil = 1; //sessionStorage.perfil;
	loadMenu();

	function loadMenu () {
		var promiseGet = loginService.getMenu($scope.idPerfil); 
        promiseGet.then(function (pl) {
            $scope.Menu = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}
})