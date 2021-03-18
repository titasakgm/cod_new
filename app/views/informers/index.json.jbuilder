json.array!(@informers) do |informer|
  json.extract! informer, :id, :fname, :lname
  json.url informer_url(informer, format: :json)
end
