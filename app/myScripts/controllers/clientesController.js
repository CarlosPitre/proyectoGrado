app.controller('clientesController',  function($scope,clienteService,editableOptions, editableThemes){
	$scope.Clientes = [];
	$scope.Departamentos = [];
    $scope.Municipios = [];
    $scope.Cliente = {};
    $scope.active = false;
    loadClientes();
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
    loadDepartamentos();

    $scope.addCliente = function() {
        $scope.inserted = {
            id: $scope.Clientes.length+1,
            cedula: '',
            nombres: '',
            apellidos: '',
            correo: '',
            direccion:'',
            telefono:'',
            tipoDoc:''
        };
        $scope.Clientes.push($scope.inserted);
    };

    $scope.removeCliente = function(index) {
      $scope.Clientes.splice(index, 1);
    };


	function loadClientes () {
		var promiseGet = clienteService.getAll();
        promiseGet.then(function (pl) {
            $scope.Clientes = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

    function loadDepartamentos () {
       var promiseGet = clienteService.getDepartamentos();
        promiseGet.then(function (pl) {
            $scope.Departamentos = pl.data;
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

    $scope.loadMunicipios = function  () {

        var promiseGet = clienteService.getMunicipios($scope.Cliente.idDepartamento);
        promiseGet.then(function (pl) {
            $scope.Municipios = pl.data;
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

    $scope.saveCliente = function(data, id) {
      angular.extend(data, {id: id});
      var promisePost = clienteService.post(data);
      promisePost.then(function (pl) {
          alert(pl.data);
          loadClientes();
      },
      function (errorPl) {
          console.log('Error Al Cargar Datos', errorPl);
      });
    };



})
