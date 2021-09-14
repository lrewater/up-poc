import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Results from "./Results";
import { isWidthDown, withWidth } from "@material-ui/core";
import { pluralize } from "inflected";
import { useApp } from "../../AppProvider";
import { CRUD_DISPLAY_MODES } from "../../constants";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import IndexAppBar from "./IndexAppBar";
import { useHistory } from "react-router-dom";

function CrudIndexPage({ width, modelName }) {
  const app = useApp();
  const history = useHistory();

  const [displayMode, setDisplayMode] = useState(
    localStorage.getItem(`crudViewResultDisplayMode_${modelName}`) ??
      (isWidthDown("xs", width)
        ? CRUD_DISPLAY_MODES.LIST
        : CRUD_DISPLAY_MODES.TABLE)
  );

  return (
    <div style={{ height: "100%" }}>
      <Helmet title={pluralize(modelName)} />

      <ConfirmDeleteDialog
        modelName={modelName}
        open={app.confirmDialogOpen}
        setOpen={app.setConfirmDialogOpen}
        afterDelete={() => {
          history.push(`${window.location.pathname}`);
        }}
      />

      <IndexAppBar
        modelName={modelName}
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
      />

      <Results modelName={modelName} displayMode={displayMode} />
    </div>
  );
}

export default withWidth()(CrudIndexPage);