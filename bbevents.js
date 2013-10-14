(function() {
  define([
    'backbone',
    'jquery',
    'when',
    'wire/lib/connection'
],
function(Backbone, JQuery, When, connection){;
  return function(options) {
    var connectEvents, events;
    events = [];
    connectEvents = function(wire, facet) {
      var connects;
      connects = facet.options;
      return _.each(facet.options, function(target, event) {
        var sourceModule, targetArr, targetMethod;
        targetArr = target.split('.');
        targetMethod = targetArr[1];
        sourceModule = facet.target;
        return wire.getProxy(targetArr[0]).then(function(targetModule) {
          return events.push(sourceModule.on(event, function() {
            return targetModule.invoke(targetMethod, [arguments]);
          }));
        });
      });
    };
    return {
      facets: {
        bbConnect: {
          connect: function(resolver, facet, wire) {
            return resolver.resolve(connectEvents(wire, facet));
          },
          destry: function(resolver, facet, wire) {
            return _.each(events, function(event) {
              return facet.target.off(event);
            });
          }
        }
      }
    };
  };

  });

}).call(this);
