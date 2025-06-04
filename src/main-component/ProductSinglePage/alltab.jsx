
   import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { addComment, fetchAllComments, deleteComment } from '../../api/CommentAPI.jsx';
import { fetchAllRatings, addRating, updateRating } from '../../api/RatingAPI.jsx';
import classnames from 'classnames';
import moment from 'moment';
import { FaStar } from 'react-icons/fa';

const ProductTabs = () => {
    const [activeTab, setActiveTab] = useState('1');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [ratings, setRatings] = useState([]);
    const [userRating, setUserRating] = useState(0);
    const [hover, setHover] = useState(null);

    const userId = 1; // giả lập userId
    const productId = 1; // giả lập productId

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const loadComments = async () => {
        try {
            const data = await fetchAllComments();
            setComments(data.filter(c => c.productId === productId));
        } catch (error) {
            console.error('Failed to load comments:', error);
        }
    };

    const loadRatings = async () => {
        try {
            const data = await fetchAllRatings();
            const filtered = data.filter(r => r.productId === productId);
            setRatings(filtered);

            // Set userRating khi load
            const currentUserRating = filtered.find(r => r.userId === userId);
            if (currentUserRating) {
                setUserRating(currentUserRating.rating);
            } else {
                setUserRating(0);
            }
        } catch (error) {
            console.error('Failed to load ratings:', error);
        }
    };

    useEffect(() => {
        if (activeTab === '2') {
            loadComments();
            loadRatings();
        }
    }, [activeTab]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await addComment({ userId, productId, content: newComment });
            setNewComment('');
            loadComments();
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteComment(id);
            loadComments();
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    const handleRatingSubmit = async (e) => {
        e.preventDefault();

        try {
            // Kiểm tra user đã đánh giá chưa
            const existingRating = ratings.find(r => r.userId === userId);

            if (existingRating) {
                // Cập nhật đánh giá
                await updateRating(existingRating.id, { userId, productId, rating: userRating });
            } else {
                // Thêm đánh giá mới
                await addRating({ userId, productId, rating: userRating });
            }

            loadRatings();
        } catch (error) {
            console.error('Failed to submit rating:', error);
        }
    };

    const averageRating = ratings.length > 0
        ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
        : '0.0';

    return (
        <div className="row">
            <div className="col col-xs-12">
                <div className="product-info">
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => toggle('1')}>
                                Description
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => toggle('2')}>
                                Review
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <p>This is a description tab.</p>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <div className="review-section">
                                <div className="mb-4">
                                    <h5>Average Rating: {averageRating} / 5</h5>
                                    {[...Array(5)].map((_, index) => {
                                        const ratingValue = index + 1;
                                        return (
                                            <label key={index}>
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value={ratingValue}
                                                    onClick={() => setUserRating(ratingValue)}
                                                    style={{ display: 'none' }}
                                                />
                                                <FaStar
                                                    color={ratingValue <= (hover || userRating) ? '#ffc107' : '#e4e5e9'}
                                                    size={25}
                                                    onMouseEnter={() => setHover(ratingValue)}
                                                    onMouseLeave={() => setHover(null)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </label>
                                        );
                                    })}
                                    <form onSubmit={handleRatingSubmit}>
                                        <button type="submit" className="btn btn-success mt-2" disabled={userRating === 0}>
                                            Submit Rating
                                        </button>
                                    </form>
                                </div>

                                <h5>Comments</h5>
                                {comments.map((comment) => (
                                    <div key={comment.id} className="border p-3 mb-2">
                                        <div className="d-flex justify-content-between">
                                            <h6>{comment.userName}</h6>
                                            <small>{moment(comment.createdAt).format('YYYY-MM-DD HH:mm')}</small>
                                        </div>
                                        <p>{comment.content}</p>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(comment.id)}>Delete</button>
                                    </div>
                                ))}

                                <form onSubmit={handleCommentSubmit} className="mt-4">
                                    <h6>Add a Comment</h6>
                                    <textarea
                                        className="form-control mb-2"
                                        placeholder="Your comment"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        required
                                    />
                                    <button type="submit" className="btn btn-primary">Post Comment</button>
                                </form>
                            </div>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        </div>
    );
};

export default ProductTabs;
