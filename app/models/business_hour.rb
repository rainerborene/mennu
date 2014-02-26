module Menu
  module Models
    class BusinessHour < Sequel::Model
      many_to_one :place

      def to_json(options={})
        super({ only: [:id, :weekday, :start_time, :end_time] }.merge(options))
      end
    end
  end
end
