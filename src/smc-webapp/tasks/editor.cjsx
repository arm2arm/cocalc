###
Top-level react component for task list
###

{React, rclass, rtypes}  = require('../smc-react')

{UncommittedChanges} = require('../jupyter/uncommitted-changes')

{TaskList}  = require('./list')

{ButtonBar} = require('./buttonbar')

{Find}      = require('./find')

exports.TaskEditor = rclass ({name}) ->
    propTypes :
        actions : rtypes.object.isRequired

    reduxProps :
        "#{name}" :
            tasks                   : rtypes.immutable.Map
            visible                 : rtypes.immutable.List
            current_task_id         : rtypes.string
            has_unsaved_changes     : rtypes.bool
            has_uncommitted_changes : rtypes.bool

    shouldComponentUpdate: (next) ->
        return @props.tasks != next.tasks or \
               @props.visible != next.visible or \
               @props.current_task_id != next.current_task_id or \
               @props.has_unsaved_changes != next.has_unsaved_changes or \
               @props.has_uncommitted_changes != next.has_uncommitted_changes

    render_uncommitted_changes: ->
        if not @props.has_uncommitted_changes
            return
        <div style={margin:'10px', padding:'10px', fontSize:'12pt'}>
            <UncommittedChanges
                has_uncommitted_changes = {@props.has_uncommitted_changes}
                delay_ms                = {10000}
                />
        </div>

    render_find: ->
        <Find actions={@props.actions} />

    render_button_bar: ->
        <ButtonBar
            actions                 = {@props.actions}
            has_unsaved_changes     = {@props.has_unsaved_changes}
            current_task_id         = {@props.current_task_id}
            current_task_is_deleted = {@props.tasks?.get(@props.current_task_id)?.get('deleted')}
            />

    render_list: ->
        if not @props.tasks? or not @props.visible?
            return
        <TaskList
            actions         = {@props.actions}
            tasks           = {@props.tasks}
            visible         = {@props.visible}
            current_task_id = {@props.current_task_id}
        />

    render: ->
        <div style={margin:'15px', border:'1px solid grey'}>
            {@render_uncommitted_changes()}
            {@render_find()}
            {@render_button_bar()}
            {@render_list()}
        </div>