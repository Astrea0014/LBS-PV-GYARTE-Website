export const errors = {
  not_connected: 'Cannot disconnect; not connected.',
  already_connected: 'Cannot connect; already connected.',
  result_empty: 'Failed to fetch data: result list is empty.',
  data_requester_not_exists: (type: string): string => `Data requester for type ${type} could not be found; no matching data requester registered.`,
  input_nan: 'Input is ill-formatted; value is NaN.'
};