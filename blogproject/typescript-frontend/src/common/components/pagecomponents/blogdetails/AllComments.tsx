import { FC } from "react";
import Row from "../../row";

interface ICommentData {
  blogscomment: Array<{
    name?: string;
    content?: string;
    profilePic?: string;
  }>;
}

const Comment: FC<ICommentData> = ({ blogscomment }) => {
  return (
    <Row className="flex-col w-[80%] max-h-[250px] overflow-y-scroll mt-2">
      {blogscomment?.map((val: any, ind: any) => (
        <Row key={ind} className="w-full  items-center border-b py-1 gap-3 ">
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden ">
            <img
              src={val.imgSrc}
              alt="commentor Pic"
              className="w-full h-full object-cover"
            />
          </div>
          <Row className="flex-col ">
            <h2>{val.name}</h2>
            <p>{val.comment}</p>
          </Row>
        </Row>
      ))}
    </Row>
  );
};

export default Comment;
