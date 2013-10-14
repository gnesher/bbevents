`define([
    'backbone',
    'jquery',
    'when',
    'wire/lib/connection'
],
function(Backbone, JQuery, When, connection){`

return (options) ->

    events = []

    connectEvents = (wire, facet) ->
        connects = facet.options
        _.each(facet.options, (target, event) ->
            targetArr = target.split('.')
            targetMethod = targetArr[1]
            sourceModule = facet.target
            
            wire.getProxy(targetArr[0]).then((targetModule) ->
                events.push(sourceModule.on(event, -> targetModule.invoke(targetMethod,[arguments])))
            )
        )

    facets:
        bbConnect: 
            connect: (resolver, facet, wire) ->                
                resolver.resolve(connectEvents(wire, facet)) 
            destry: (resolver, facet, wire) ->
                _.each(events, (event) ->
                    facet.target.off(event)
                )

`})`
