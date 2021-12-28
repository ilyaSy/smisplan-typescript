import Sidebar from "./Sidebar";
import {render} from "@testing-library/react";
import {StorageProvider} from "../../storages/storage";

describe('Sidebar component', () => {
  test('Snapshot', () => {
    const sidebar = render(
      <StorageProvider>
        <Sidebar />
      </StorageProvider>
    );

    expect(sidebar).toMatchSnapshot();
  })
});