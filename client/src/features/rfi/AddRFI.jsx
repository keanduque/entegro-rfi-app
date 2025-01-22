import CreateRFIForm from "./CreateRFIForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { MdOutlinePostAdd } from "react-icons/md";

function AddRFI({ title }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="rfi-form">
          <Button $size="medium">
            <MdOutlinePostAdd />
          </Button>
        </Modal.Open>
        <Modal.Window name="rfi-form">
          <CreateRFIForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddRFI() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button
//         onClick={() => setIsOpenModal((show) => !show)}
//         $size="large"
//         $variation="primary"
//       >
//         <MdOutlinePostAdd />
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateRFIForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddRFI;
