import {
    Button,
    Checkbox,
    Form,
    Input,
    Select,
    Card,
    Col,
    Row,
} from 'antd';

const { Option } = Select;

const UserLoginDetails = (props) => {
const {form} = props;
    return (
        <>
        <Form.Item
                name="fullname"
                label="Fullname"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Fullname',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="name"
                label="Username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
              name="userType"
              label="User"
              initialValue={"user"}
            >
              <Select
                defaultValue="user"
                style={{
                  width: '100%',
                }}
                options={[
                    {
                        value: 'user',
                        label: 'User',
                    },
                    {
                        value: 'moderator',
                        label: 'Moderator',
                    },
                    {
                        value: 'admin',
                        label: 'Admin',
                    },
                    {
                        value: 'organizer',
                        label: 'Event Organizer',
                    }
                ]}
              />
            </Form.Item>
            </>

    );
};
export default UserLoginDetails;
