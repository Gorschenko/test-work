export const TYPES = {
  Application: Symbol.for('Application'),
  LoggerService: Symbol.for('LoggerService'),
  BaseExceptionFilter: Symbol.for('BaseExceptionFilter'),
  HttpExceptionFilter: Symbol.for('HttpExceptionFilter'),
  ConfigService: Symbol.for('ConfigService'),
  MysqldbService: Symbol.for('MysqldbService'),

  CitiesController: Symbol.for('CitiesController'),
  ListController: Symbol.for('ListController'),

  CityService: Symbol.for('CityService'),
  ListService: Symbol.for('ListService'),
  DatabaseService: Symbol.for('DatabaseService'),

  CityRepository: Symbol.for('CityRepository'),
  NewCityRepository: Symbol.for('NewCityRepository'),
  ListRepository: Symbol.for('ListRepository'),
};
