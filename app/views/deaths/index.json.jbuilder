json.array!(@deaths) do |death|
  json.extract! death, :id, :pid13, :sex, :age, :d_date, :d_cod, :cod
  json.url death_url(death, format: :json)
end
