import { createPortal } from 'react-dom';
import React from 'react';

const OrderModal = ({ isShowing, hide, orderDetail }) => isShowing ? createPortal(
    <>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <span className="modal-title">
                        <b>Danh sách món</b>
                    </span>
                    <button className="modal-close-button" onClick={hide}
                        data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                {
                    orderDetail.length > 0 &&
                    <div className="table-box">
                        <table id="food-table">
                            <thead>
                                <tr>
                                    <th>Tên món</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    orderDetail.map(o => (
                                        <tr key={o.foodId}>
                                            <td>{o.foodName}</td>
                                            <td>{o.price}</td>
                                            <td>{o.quantity}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    </>, document.body
) : null;

export default OrderModal;
