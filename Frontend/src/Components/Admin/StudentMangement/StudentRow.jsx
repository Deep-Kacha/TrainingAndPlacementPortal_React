import { FaTrash } from "react-icons/fa";

const StudentRow = ({ student, onDelete }) => {

  return (
    <tr className="bg-[#d8cfc3] border-t">

      <td className="p-4 font-semibold">{student.name}</td>

      <td className="p-4">{student.enrollment}</td>

      <td className="p-4">{student.course}</td>

      <td className="p-4">{student.batch}</td>

      <td className="p-4">{student.cgpa}</td>

      <td className="p-4">{student.email}</td>

      <td className="p-4 text-center">
        <input
          type="checkbox"
          defaultChecked={student.approved}
          className="accent-purple-600"
        />
      </td>

      <td className="p-4 text-center">
        <button
          onClick={() => onDelete(student.id)}
          className="text-red-600"
        >
          <FaTrash />
        </button>
      </td>

    </tr>
  );
};

export default StudentRow;