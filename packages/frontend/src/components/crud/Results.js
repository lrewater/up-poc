import { useSelector } from "react-redux";
import React from "react";
import { Grid, withWidth } from "@material-ui/core";
import { useQuery } from "react-query";
import Loader from "../Loader";
import { DISPLAY_MODES } from "../../pages/models/contacts/ContactsConfig";
import { ResultsTable } from "./ResultsTable";
import { ResultsList } from "./ResultsList";
import { ResultsGrid } from "./ResultsGrid";
import styled from "styled-components/macro";
import { pluralize } from "inflected";
import CreateModelButton from "./CreateModelButton";
import { findRecords } from "../../services/crudService";
import { ErrorCard } from "./ErrorCard";
import useService from "../../hooks/useService";
import { useApp } from "../../AppProvider";

const Root = styled(Grid)`
  height: calc(100% - 24px);
  padding-bottom: 49px;
  ${(props) => props.theme.breakpoints.down("xs")} {
    padding-bottom: 100px;
  }
`;

function Results({ modelName, width, displayMode }) {
  const app = useApp();
  const service = useService({ toast: false });
  const endpoint = pluralize(modelName).toLowerCase();
  const crud = useSelector((state) => state.crudReducer);
  const { isLoading, error, data } = useQuery(
    [`${endpoint}.index`, crud.record],
    async () => {
      try {
        let result = await service([findRecords, [modelName]]);
        return { data: result };
      } catch (err) {
        console.error(err);
        app.doToast("error", err);
      }
    },
    { keepPreviousData: true }
  );

  if (isLoading) return <Loader />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <Root container spacing={0}>
      <Grid item xs={12}>
        {data?.data?.length === 0 && (
          <ErrorCard
            title="No Records Found"
            subtitle="There were no results for your query."
            actions={
              <CreateModelButton fullWidth={false} modelName={modelName} />
            }
          />
        )}
        {data?.data?.length > 0 && (
          <>
            {displayMode === DISPLAY_MODES.TABLE && (
              <ResultsTable
                modelName={modelName}
                data={data.data}
                endpoint={endpoint}
                width={width}
              />
            )}
            {displayMode === DISPLAY_MODES.LIST && (
              <ResultsList modelName={modelName} data={data.data} />
            )}
            {displayMode === DISPLAY_MODES.CARD && (
              <ResultsGrid modelName={modelName} data={data.data} />
            )}
          </>
        )}
      </Grid>
    </Root>
  );
}

export default withWidth()(Results);