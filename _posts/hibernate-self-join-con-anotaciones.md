<p>Vamos a dejar por unos instantes tanto Javascript sin tipos y sin estructura y pongámonos otra
vez la corbata para volver al mainstream de aplicaciones empresariales J2EE. Quedaba pendiente ver
cómo montar un self-join pero con anotaciones, es decir una clase que se hace referencia a sí misma.
En su momento ya puse aquí la versión con el <a href="http://www.pello.info/index.php/blog/hibernate-self-join-con-xml">mapeo por XML</a>, vamos a ver cómo quedaría
la cosa pero usando las anotaciones en la propia clase Department.</p>

<pre class="brush: java">
/**
 * 
 */
package info.pello.maven.hibernate.HibernateAnnotationsSamples;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


/**
 * Represents a company Department
 * @author Pello Altadill
 * @greetz for those who keep on working even in summertime
 */
@Entity
@Table(name="department")
public class Department {
	@Id
	@Column(name="id")
	@GeneratedValue
	private int id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="description")
	private String description;
	
	@Column(name="main_department")
	private int mainDepartmentId; 
	
	@OneToMany(mappedBy="mainDepartment")
    private Set<Department> departments;
    

	@ManyToOne(cascade={CascadeType.ALL})
	@JoinColumn(name="main_department", insertable = false, updatable = false)
	private Department mainDepartment;
	
	/**
	 * default constructor needed by hibernate
	 */
	public Department () {
		
	}

	/**
	 * @param id
	 * @param name
	 * @param description
	 * @param mainDepartment
	 */
	public Department(int id, String name, String description,int mainDepartmentId) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.mainDepartmentId = mainDepartmentId;
	}

	
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Department [id=" + id + ", name=" + name + ", description="
				+ description + ", mainDepartmentId=" + mainDepartmentId + "]";
	}

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the mainDepartment
	 */
	public int getMainDepartmentId() {
		return mainDepartmentId;
	}

	/**
	 * @param mainDepartment the mainDepartment to set
	 */
	public void setMainDepartmentId(int mainDepartmentId) {
		this.mainDepartmentId = mainDepartmentId;
	}

	/**
	 * @return the departments
	 */
	public Set<Department> getDepartments() {
		return departments;
	}

	/**
	 * @param departments the departments to set
	 */
	public void setDepartments(Set<Department> departments) {
		this.departments = departments;
	}

	/**
	 * @return the mainDepartment
	 */
	public Department getMainDepartment() {
		return mainDepartment;
	}

	/**
	 * @param mainDepartment the mainDepartment to set
	 */
	public void setMainDepartment(Department mainDepartment) {
		this.mainDepartment = mainDepartment;
	}

}

</pre>

<p>Y poco más realmente, basta con incluir una línea en el fichero de hibernate 
para decirle que tenga en cuenta nuestra clase:</p>

<pre class="brush: xml">
...
        <mapping class="info.pello.maven.hibernate.HibernateAnnotationsSamples.Department" />
...
</pre>

<p>En esta serie de posts (que sí, muchos otros lo han hecho mil veces pero hay que probarlo por uno mismo para asimilarlo mejor) hemos ido viendo distintos escenarios de mapeo con las dos opciones de mapeo, pero esto no es todo lo que hibernate ofrece.  Aún queda cosa por ver como por ejemplo el 
uso de su pseudo SQL para poder hacer consultas más personalizadas. Aún queda muuuucho por andar, así que dejemos como fondo la letra de <i>Perennial Quest</i> del mejor grupo de la historia: Death</p>

<pre><i>
The journey begins with curiosity
And involves into soul-felt questions
On the stones that we walk
And choose to make our path
Sometimes never knowing
Other times knowing too much

Filtering out the bad that holds us back
Take hold of what is true to your hunger
A hunger that will not go away
Plans for tomorrow, they will remain

Won't you join me on the perennial quest?
Reaching into the dark, retrieving light
Search for answers on the perennial quest
Where dreams are followed and time is a test
...
</i></pre>