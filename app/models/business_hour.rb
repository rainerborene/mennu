module Menu
  module Models
    class BusinessHour < Sequel::Model
      many_to_one :place

      def as_json(options = nil)
        {
          id: id,
          weekday: weekday,
          start_time: start_time.strftime("%H:%M"),
          end_time: end_time[0..4]
        }
      end
    end
  end
end
