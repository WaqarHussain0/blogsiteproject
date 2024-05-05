import { FC, useState } from "react";
import Row from "../../row";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { engagementActionCreator } from "../../../redux/actions/engagement.action";

interface ICommentButton {
  onClick?: () => void;
}

const AddComment: FC<ICommentButton> = ({ onClick }) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState({ content: "" });
  const params = useParams();
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };
  const handleSubmitComment = () => {
    const dataToSend = {
      comment: newComment.content,
      commentorID: localStorage.getItem("userID"),
      blogID: params.blogID,
      token: localStorage.getItem("Access Token"),
    };

    // if (!dataToSend.token) {
    //   console.log("Access Token is missing");
    //   return;
    // }

    console.log("Comment button clicked", dataToSend);
    dispatch(engagementActionCreator.addComment(dataToSend));
  };
  return (
    <Row className="items-start justify-between w-[80%] border-b  mt-4 relative">
      <textarea
        id="content"
        name="content"
        placeholder="Add comment"
        value={newComment.content}
        onChange={handleOnChange}
        className=" py-2 w-[90%] resize-none  outline-none bg-transparent  "
      />
      <button
        onClick={handleSubmitComment}
        className="bg-indigo-600 text-white rounded-full px-4 py-1 absolute top-2 right-2"
      >
        Post
      </button>
    </Row>
  );
};

export default AddComment;
