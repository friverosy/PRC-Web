'use strict';

var app = require('../../server/server');
var Promise = require('bluebird');

module.exports = function(Register) {
  Register.validatesPresenceOf('dni', {
    message: 'Invalid Person',
  });

  // Register.beforeRemote('create', function (context, user, next) {
  //     context.args.data.time = Date.now();
  //     context.args.data.operatorId = context.req.accessToken.userId;
  //     next();
  // });

  Register.observe('after save', function(ctx, next) {
    if (ctx.instance) {
      // Update person & register synchronously
      getName(ctx.instance)
        .then(person => upsertPerson(person))
        .then(person => updateRegister(person))
        .catch(err => console.log(err));
    }
    next();
  });

  /**
   *
   * @param {any} ctx
   * Using the dni of the context received (ctx) from the post,
   * obtains the name of the person from PeopleAPI
   * @returns
   * If found it returns the data of the person from PeopleAPI
   * otherwise returns a null
   */
  function getName(ctx) {
    return new Promise(function(resolve, reject) {
      var Chilean = app.models.Chilean;
      Chilean.getName(ctx.dni, function(err, person) {
        if (err) {
          reject(err);
        }
        resolve(person);
      });
    });
  }

  /**
   * Update the person's name on the local model,
   * if does not exist, is created
   * with the name returned by PeopleAPI
   *
   * @param {any} person returned by getName()
   * @returns the person's data from the local model
   */
  function upsertPerson(person) {
    return new Promise(function(resolve, reject) {
      var Person = app.models.Person;
      Person.upsertWithWhere({dni: person.dni},
        {
          dni: person.dni,
          name: person.name,
        },
        function(err, person) {
          if (err) {
            reject(err);
          } else {
            console.log('Person updated');
            resolve(person);
          }
        }
      );
    });
  }

  /**
   * Update the register's personId on the local model
   * with the objectId returned by upsertPerson()
   *
   * @param {any} person from local model
   * @returns
   */
  function updateRegister(person) {
    return new Promise(function(resolve, reject) {
      Register.updateAll({
        dni: person.dni,
      }, {
        personId: person.id,
      },
      function(err, register) {
        if (err) {
          reject(err);
        } else {
          console.log('Register updated', register);
          resolve();
        }
      });
    });
  }
};
