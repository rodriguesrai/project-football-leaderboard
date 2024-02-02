import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import TeamsModelSequelize from './TeamsModelSequelize';

class MatchesModelSequelize extends Model<InferAttributes<MatchesModelSequelize>,
InferCreationAttributes<MatchesModelSequelize>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModelSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */
MatchesModelSequelize.belongsTo(TeamsModelSequelize, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

MatchesModelSequelize.belongsTo(TeamsModelSequelize, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

TeamsModelSequelize.hasMany(MatchesModelSequelize, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
TeamsModelSequelize.hasMany(MatchesModelSequelize, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default MatchesModelSequelize;
