bbevents
========

A wire(https://github.com/cujojs/wire) for backbone events
Allows user to assign backbone events from one component to an existing method on a different component.

Sample Code
===========

Connects the "route" event of an existing component called router (which is a Backbone router) 
to a changeRoute method on a differnt component.

    router:
        bbConnect:
            'route': 'viewModel.changeRoute'
