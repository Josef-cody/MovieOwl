import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import avatar from '../../../data_base/avatar';

function Avatar({ changeSelection }) {
    const [selectAvatar, setSelectAvatar] = useState({ profilePic: './imgs/avatars/avatar-1.png' });
    changeSelection(selectAvatar)
    return <>
        <Row xs={2} md={2} xlg={6} className="g-4">
            {Array.from(avatar).map((img, index) => {
                return <>
                    <Col key={index} className="mb-3">
                        <Form>
                            <label htmlFor={`avatar-${index}`} name='profilePic'>
                                <img src={img.avatar_img} alt='avatar' />
                            </label>
                            <Form.Check
                                style={{display:'none'}}
                                label={`avatar-${index}`}
                                name='profilePic'
                                value={img.avatar_img}
                                type='radio'
                                id={`avatar-${index}`}
                                onClick={(e) => setSelectAvatar({ profilePic: e.target.value })}
                            />
                        </Form>
                    </Col>
                </>
            })}
        </Row>
    </>
}

export default Avatar;