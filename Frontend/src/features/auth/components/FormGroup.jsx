const FormGroup = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="form-group">
        <label htmlFor={label}>{label}:</label>
        <input 
          type="text" 
          id={label} 
          name={label} 
          placeholder={placeholder} 
          required
          value={value}
          onChange={onChange} />
    </div>
  )
}

export default FormGroup