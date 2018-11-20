import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const { TextArea } = Input;

const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="Content">
                            {getFieldDecorator('content')(<TextArea rows={8} type="textarea" />)}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

class CollectionsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            newArticle: {
                title: {},
                content: {}
            },
        }
    }

    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleNewArticle(response) {
        console.log('CollectionsPage.handleNewArticle()');
        console.log(response);
        this.props.addArticle(true);
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            axios.post(`http://127.0.0.1:8000/api/`, {
                title: values.title,
                content: values.content
            }).then(function (response) {
                this.handleNewArticle(response);
            }.bind(this))
                .catch(function (error) {
                    console.log(error);
                    console.log('error posting article');
                    console.log(values)
                })
            this.setState({ visible: false });
            form.resetFields();
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>New Article</Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel.bind(this)}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default CollectionsPage;