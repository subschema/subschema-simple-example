var React = require('react');
var Subschema = require('subschema'),
    Form = Subschema.Form;
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

var App = React.createClass({
    componentWillMount(){
        this.valueManager = Subschema.ValueManager(this.props.data);
        this._listeners = [
            this.valueManager.addListener('color', function (value) {
                console.log('color', value);
            }),
            this.valueManager.addListener(null, function (value) {
                console.log('all', value);
            })
        ]
    },
    componentWillUnmount(){
        this._listeners.forEach((v)=>v.remove());
    },
    handleSubmit(e){
        e && e.preventDefault();
        console.log('submit was called', arguments);
        alert('handle submit');
    },
    render(){
        return <Form schema={schema} onSubmit={this.handleSubmit} valueManager={this.valueManager}>
            <button type="submit">Submit</button>
        </Form>
    }

});

module.exports = App;