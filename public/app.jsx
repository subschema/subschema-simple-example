"use strict";

import React, {Component} from 'react';
import Subschema, {Form} from 'subschema';

var schema = {
    schema: {
        name: 'Text',
        color: {
            type: 'Select',
            options: ['red', 'blue', 'green']
        }
    },
    fields: ['name', 'color']

};

export default class App extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.valueManager = Subschema.ValueManager(props.data);
        this._listeners = [
            //listens to just color.
            this.valueManager.addListener('color', (value)=> {
                console.log('color', value);
            }),
            //listens to everything.
            this.valueManager.addListener(null, (value)=> {
                console.log('all', value);
            })
        ]
    }

    componentWillUnmount() {
        this._listeners.forEach((v)=>v.remove());
    }

    handleSubmit = (e, error, values)=> {
        e && e.preventDefault();
        console.log('submit was called', error, values);
        alert('handle submit');
    };

    render() {
        return <Form schema={schema} onSubmit={this.handleSubmit} valueManager={this.valueManager}>
            <button type="submit">Submit</button>
        </Form>
    }

}