module.exports = (sequelize, DataTypes) => {
  const {INTEGER, TEXT, UUID} = DataTypes;
  const TokenModelName = sequelize.define(
    'token_table_name',
    {
      id: {
        type: UUID,
        primaryKey: true,
      },
      parent_id: {
        type: UUID,
      },
      former_parent_id: {
        type: UUID,
      },
      status_id: {
        type: INTEGER,
      },
      token_display_name_column: {
        type: TEXT,
      },
      created_by: {
        type: UUID,
      },
      updated_by: {
        type: UUID,
      },
      deleted_by: {
        type: UUID,
      },
    },
    {
      defaultScope: {
        order: [['created_at', 'asc']],
      },
      schema: 'token_app_schema',
      paranoid: true,
    }
  );

  TokenModelName.associate = function (models) {
    TokenModelName.belongsTo(models.content_node_statuses, {
      foreignKey: 'status_id',
      as: 'content_node_statuses',
    });
    TokenModelName.hasMany(models.token_table_name, {
      foreignKey: 'parent_id',
      as: 'versions',
    });
    TokenModelName.belongsTo(models.token_table_name, {
      foreignKey: 'parent_id',
      as: 'parent',
    });
  };

  return TokenModelName;
};
