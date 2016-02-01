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
    componentWillMount() {
        this.valueManager = Subschema.ValueManager(this.props.data);
        this._listeners = [
            this.valueManager.addListener('color', function (value) {
                console.log('color', value);
            }),
            this.valueManager.addListener(null, function (value) {
                console.log('all', value);
            })
        ]
    }

    componentWillUnmount() {
        this._listeners.forEach((v)=>v.remove());
    }

    handleSubmit = (e)=> {
        e && e.preventDefault();
        console.log('submit was called', arguments);
        alert('handle submit');
    };

    render() {
        return <Form schema={schema} onSubmit={this.handleSubmit} valueManager={this.valueManager}>
            <button type="submit">Submit</button>
        </Form>
    }

}