storageEngine = function() {
	function getStorageObject(type) {
		var item = localStorage.getItem(type);
		var parsedItem = JSON.parse(item);
		return parsedItem;
	}
	var initialized = false;
	var initializedObjectStores = {};
	return {
		init : function(successCallback, errorCallback) {
			if (window.localStorage) {
				initialized = true;
				successCallback(null);
			} 
			else {
				errorCallback('storage_api_not_supported', 'The web storage api is not supported');
			}
		},
		initObjectStore : function(type, successCallback, errorCallback) {
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} 
			else if (!localStorage.getItem(type)) {
				localStorage.setItem(type, JSON.stringify({}));
			}
			initializedObjectStores[type] = true;
			successCallback(null);
		},
		save: function(type, obj, successCallback, errorCallback) {						
			$.ajax({
  				method: "POST",
  				url: "home/save",
  				data: obj
			})
  			.done(function( msg ) {  				
    			successCallback(obj);
  			});
		
			
		},
		findAll : function(type, successCallback, errorCallback) {		
			$.ajax({
				method : 'get',
  				dataType: "json",
  				url: "home/list",  				
  				success: function (data) {  					
  					var result = [];					
					$.each(data, function(i, v) {
						result.push(v);
					});
					successCallback(result);
  				}  			
			});				
		},
		delete : function(type, id, successCallback, errorCallback) { 
			$.ajax({
				method : 'get',
  				dataType: "json",
  				url: "home/deletar/"+id,  				
  				success: function (data) {  					
  					console.log(data)					
					successCallback(id);
  				}  			
			});				
		},
		findByProperty : function(type, propertyName, propertyValue, successCallback, errorCallback) {
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!initializedObjectStores[type]) {
				errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
			}
			var result = [];
			var storageItem = getStorageObject(type); 
			$.each(storageItem, function(i, v) {
				if (v[propertyName] === propertyValue) {
					result.push(v);
				}
			}); 
			successCallback(result);
		},
		findById : function (type, id, successCallback, errorCallback)	{						
			$.ajax({
				method : 'get',
  				dataType: "json",
  				url: "home/getById/"+id,  				
  				success: function (data) {  					
  					console.log(data)					
					successCallback(data);
  				}  			
			});	


			
		}
	}
}();