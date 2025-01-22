import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { MdOutlinePostAdd } from "react-icons/md";
import CreateRFIWayleaveForm from "./CreateRFIWayleaveForm";

function AddWayleave({ rfi, title = "" }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="wayleave-form">
          <Button $size="medium" title={title}>
            <MdOutlinePostAdd />
          </Button>
        </Modal.Open>
        <Modal.Window name="wayleave-form">
          <CreateRFIWayleaveForm rfi={rfi} />
        </Modal.Window>
      </Modal>
    </div>
  );
}
export default AddWayleave;
