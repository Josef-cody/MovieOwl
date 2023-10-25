import React, { useState } from "react";
import { Container, Col, Row, Modal, Button } from "react-bootstrap";
import { useQuery, useInfiniteQuery } from 'react-query'
import {
    CreateNewComment,
    getMovieComment,
    getUsersComment,
    UpdateOneComment,
    DeleteOneComment
} from '../../hooks/comments'
import { useForm, Controller } from "react-hook-form";
import jwt_decode from "jwt-decode";


function Comment(props) {
    const movie_id = props.movie_id;
    //modal controller
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [smShow, setSmShow] = useState(false);
    const [comment_id, setComment_id] = useState();
    const { data: comments,
        isLoading,
        error,
        hasNextPage,
        fetchNextPage,
        isFetching,
        isFetchingNextPage } = useInfiniteQuery(
            ['getMovieComments', movie_id],
            () => getMovieComment(movie_id),
            {
                getNextPageParam: (_lastPage, pages) => {
                    if (pages.length < 1) {
                        return pages.length + 1
                    } else {
                        return undefined
                    }
                },
                refetchOnWindowFocus: false,
                refetchInterval:2000
            }
        );
    const [updateStats, setUpdateStats] = useState({ comments });
    const { mutate: postComment } = CreateNewComment();
    const { mutate: updateComment } = UpdateOneComment();
    const { mutate: deleteComment } = DeleteOneComment();
    const { data: userComment } = useQuery(['getUserComment', comment_id],
        () => getUsersComment(comment_id));
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm();

    const onSubmit = (data) => {
        postComment({ movie_id, data });
        reset();
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateStats((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };
    const onSubmitUpdate = () => {
        updateComment({ comment_id, updateStats });
    };

    const handelDelete = () => {
        deleteComment({ comment_id })
    }
    const token = localStorage.getItem('Access_token')
    const decoded = jwt_decode(token);
    const username = decoded.name;

    if (isLoading) {
        return <>
            <div></div>
        </>
    }
    if (error) {
        return <>
            <h4>Something went wrong</h4>
        </>
    }
    return <>
        <h6 className="movie-detail-subtitle pb-2">Comments</h6>
        <Container fluid={true}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <textarea
                        type='text'
                        name="text"
                        className="input-group form-control"
                        {...register('text', {
                            maxLength: 3000,
                            required: true
                        })}
                    />
                </Row>
                <Row>
                    <button type="submit" className="post-button ms-auto">
                        <span className="m-auto">Post</span>
                    </button>
                </Row>
            </form>
            {comments?.pages?.map((commentGroup, index) => {
                return <>
                    {commentGroup?.data?.map((comment, index) => {
                        return <>
                            <Row key={index}>
                                <Col xs={6} md={9} lg={10}>
                                    <span className="comment-detail-user-date">{comment?.name} said:</span>
                                </Col>
                                <Col xs={6} md={3} lg={2}>
                                    <span className="comment-detail-user-date">{comment?.date?.slice(0, 10)}</span>
                                    {comment?.name === username ? <i className="fa-solid fa-pen-to-square ms-2 cursor" onClick={() => { handleShow(); setComment_id(comment._id) }}></i> : <></>}

                                </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <p>{comment.text}</p>
                            </Row>
                            <hr></hr>
                        </>
                    })}
                </>
            })}
            <div><i className="fa-solid fa-angles-down fa-beat-fade" disabled={!hasNextPage} onClick={fetchNextPage}></i></div>
            <div>{isFetching && !isFetchingNextPage ? <></> : null}</div>
        </Container>
        <Modal show={show} onHide={handleClose} size='md'>
            <Modal.Header closeButton>
                <Modal.Title>
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmitUpdate)}>
                <Modal.Body>
                    <Row>
                        <textarea
                            className="form-control"
                            aria-label="With textarea"
                            name="text"
                            value={updateStats.text}
                            defaultValue={userComment?.data[0]?.text}
                            onChange={handleChange}
                        ></textarea>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        className="statsDeleteButton"
                        onClick={() => { setSmShow(true) }}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="warning"
                        className="statsDeleteButton"
                        onClick={() => { onSubmitUpdate() }}
                    >
                        Uppdate
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
        <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Are you sure?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button
                    variant="danger"
                    className="statsDeleteButton w-100"
                    onClick={() => {handelDelete();setSmShow(false);setShow(false)}}
                >
                    Delete
                </Button>
            </Modal.Body>
        </Modal>
    </>
}

export default Comment;