'use strict';

module.exports = function(Person) {
    Person.disableRemoteMethod('deleteById', true);
    
};
