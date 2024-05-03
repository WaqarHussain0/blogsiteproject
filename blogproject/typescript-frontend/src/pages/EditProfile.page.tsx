import TopBar from "../common/components/topbar";
import Row from "../common/components/row";
import EditUserData from "../common/components/pagecomponents/editprofile/UserInfo";
import DeleteAccount from "../common/components/pagecomponents/editprofile/DeleteAccount";

const EditProfilePage = () => {
  return (
    <Row className="flex-col items-center gap-4">
      <TopBar />
      <div className="flex flex-col gap-4 w-[90%] md:w-[80%]">
        <EditUserData />
        <DeleteAccount />
      </div>
    </Row>
  );
};

export default EditProfilePage;
