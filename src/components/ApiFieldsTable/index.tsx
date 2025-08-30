import { JSX } from "react";
import styles from "./styles.module.css";

export interface ApiField {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  defaultValue?: string;
}

type ApiFieldsTableProps = {
  fields: ApiField[];
}

export default function ApiFieldsTable({ fields }: ApiFieldsTableProps): JSX.Element {
  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>欄位</th>
            <th>類型</th>
            <th>說明</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={index}>
              <td>
                <div className={styles.fieldName}>
                  <code>{field.name}</code>
                </div>
              </td>
              <td>
                <code className={styles.type}>{field.type}</code>
              </td>
              <td>
                <div>
                  {field.description}
                  {field.defaultValue && (
                    <div className={styles.default}>
                      預設: <code>{field.defaultValue}</code>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}