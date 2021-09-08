import React from "react";
import styled from "styled-components/macro";
import { Grid } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import { ROUTES } from "../../constants";
import CardHeader from "@material-ui/core/CardHeader";
import { ActionsDropdown, ActionsDropdownTypes } from "./ActionsDropdown";
import { displayName } from "../../pages/models/contacts/ContactsConfig";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";

const DataCard = styled(Card)`
  height: 100%;
  border-radius: 0;
  border-bottom: 1px solid
    ${(props) =>
      props.theme.palette.type === "dark"
        ? "rgba(255, 255, 255, 0.12)"
        : "rgba(0, 0, 0, 0.12)"};
`;

export function ResultsGrid({ modelName, data }) {
  const history = useHistory();

  return (
    <div style={{ padding: "16px" }}>
      <Grid container spacing={4}>
        {data.map((row) => {
          return (
            <Grid key={row.id} item xs={12} sm={6} md={6} lg={4}>
              <DataCard>
                <CardActionArea
                  onClick={() => {
                    history.push(`${ROUTES.MODEL_CONTACTS}/${row.id}`);
                  }}
                  style={{ height: "100%" }}
                >
                  <CardHeader
                    avatar={
                      <ActionsDropdown
                        modelName={modelName}
                        params={{ id: row.id, row: row }}
                        type={ActionsDropdownTypes.INDEX}
                      />
                    }
                    title={displayName(row)}
                    subheader={row.email}
                  />
                </CardActionArea>
              </DataCard>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
